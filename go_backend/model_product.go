package main

import (
	// "fmt"
	// "net"
	// "sync"
	// "time"
	"database/sql"
)

type product struct {
	ProductId int `json:"productId"`
	Code string `json:"productCode"`
	Name string `json:"productName"`
	AvailableQuantity int `json:"availableQuantity"`

	// qtyLock sync.Mutex
}

// var sampleProducts = []product{
// 	product{
// 		ProductId: 1,
// 		Name: "product1",
// 		AvailableQuantity: 50,
// 	},
// 	product{
// 		ProductId: 2,
// 		Name: "product2",
// 		AvailableQuantity: 78,
// 	},
// }



type modelProduct struct{

}

func(m *modelProduct) findProducts() ([]product, error) {
	result := []product{}
	rows, err := DB.Query(`select * from product`)
	for rows.Next() {
		p := product{}
		err = rows.Scan(&p.ProductId, &p.Code, &p.Name, &p.AvailableQuantity)
		if err != nil {
			return nil, err
		}
		result = append(result, p)
	}
	return result, nil
}

func(m *modelProduct) lockQuantity(tx *sql.Tx, productCode string, qty int) (*product, error) {
	// lock available product quantity so that not other operations can't be performed on cart
	p := product{}
	err := tx.QueryRow(`select * from product where code = ? and availableQuantity >= ? for update;`, productCode, qty).Scan(&p.ProductId, &p.Code, &p.Name, &p.AvailableQuantity)
	if err != nil {
		// tx.Rollback()
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &p, nil
}

func newProductModel() *modelProduct {
	return &modelProduct{}
}