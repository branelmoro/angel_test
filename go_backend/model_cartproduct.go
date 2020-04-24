package main

import (
	"fmt"
	// "net"
	// "sync"
	// "time"
	"database/sql"
)

type cartproduct struct {
	Id int `json:"id"`
	CartId int `json:"cartId"`
	ProductCode string `json:"productCode"`
	Quantity int `json:"quantity"`

	// qtyLock sync.Mutex
}

var sampleCartProducts = []cartproduct{
	cartproduct{
		Id: 1,
		CartId: 1,
		ProductCode: "wsfsfa",
		Quantity: 8,
	},
	cartproduct{
		Id: 2,
		CartId: 1,
		ProductCode: "afaf",
		Quantity: 9,
	},
}

type modelCartProduct struct{

}

func(m *modelCartProduct) getCartProducts(cartId int) ([]cartproduct, error) {
	result := []cartproduct{}
	rows, err := DB.Query(`select id, cartId, productCode, quantity from cartproduct where cartId = ? and isOrdered = ?;`, cartId, false)
	for rows.Next() {
		cp := cartproduct{}
		err = rows.Scan(&cp.Id, &cp.CartId, &cp.ProductCode, &cp.Quantity)
		if err != nil {
			return nil, err
		}
		result = append(result, cp)
	}
	return result, nil
}

func(m *modelCartProduct) getCartProduct(cartId int, productCode string) (*cartproduct, error) {
	cp := cartproduct{}
	err := DB.QueryRow(`select id, cartId, productCode, quantity from cartproduct where cartId = ? and productCode = ? and isOrdered = ?;`, cartId, productCode, false).Scan(&cp.Id, &cp.CartId, &cp.ProductCode, &cp.Quantity)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &cp, nil
}

func(m *modelCartProduct) addCartProduct(cartId int, productCode string, qty int) (bool, error) {
	fmt.Println(cartId, productCode, qty)
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	cartModel := newCartModel()
	cart, err := cartModel.lockCart(tx, cartId)
	if err != nil {
		tx.Rollback()
		return false, err
	}
	if cart == nil {
		tx.Rollback()
		return false, nil
	}

	productModel := newProductModel()
	p, err := productModel.lockQuantity(tx, productCode, qty)
	if err != nil {
		tx.Rollback()
		return false, err
	}
	if p == nil {
		tx.Rollback()
		return false, nil
	}

	_, err = tx.Exec(`update product set availableQuantity = availableQuantity - ? where id = ?;`, qty, p.ProductId)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	_, err = tx.Exec(`insert into cartproduct (cartId, productCode, quantity, isOrdered) values (?, ?, ?, ?);`, cartId, productCode, qty, false)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	err = tx.Commit();
	if err != nil {
		tx.Rollback()
		return false, err
	}
	return true, nil
}

func(m *modelCartProduct) increaseProductQuantity(cartId int, productCode string, qty int) (bool, error) {
	tx, err := DB.Begin()
	if err != nil {
		return false, err
	}

	cartModel := newCartModel()
	cart, err := cartModel.lockCart(tx, cartId)
	fmt.Println("cart, err-------", cart, err)
	if err != nil {
		tx.Rollback()
		return false, err
	}
	if cart == nil {
		tx.Rollback()
		return false, nil
	}

	productModel := newProductModel()
	p, err := productModel.lockQuantity(tx, productCode, qty)
	if err != nil {
		tx.Rollback()
		return false, err
	}
	if p == nil {
		tx.Rollback()
		return false, nil
	}

	_, err = tx.Exec(`update product set availableQuantity = availableQuantity - ? where id = ?;`, qty, p.ProductId)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	_, err = tx.Exec(`update cartproduct set quantity = quantity + ? where cartId = ? and productCode = ? and isOrdered = ?;`, qty, cartId, productCode, false)
	if err != nil {
		tx.Rollback()
		return false, err
	}

	err = tx.Commit();
	if err != nil {
		tx.Rollback()
		return false, err
	}
	return true, nil
}

func(m *modelCartProduct) reduceProductQuantity(cartId int, productCode string, qty int) (error) {
	tx, err := DB.Begin()
	if err != nil {
		return err
	}

	cartModel := newCartModel()
	cart, err := cartModel.lockCart(tx, cartId)
	if err != nil {
		tx.Rollback()
		return err
	}
	if cart == nil {
		tx.Rollback()
		return nil
	}

	_, err = tx.Exec(`update product set availableQuantity = availableQuantity + ? where code = ?;`, qty, productCode)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec(`update cartproduct set quantity = quantity - ? where cartId = ? and productCode = ? and isOrdered = ?;`, qty, cartId, productCode, false)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit();
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

func(m *modelCartProduct) deleteCartProduct(cartId int, productCode string) (error) {
	tx, err := DB.Begin()
	if err != nil {
		return err
	}

	cartModel := newCartModel()
	cart, err := cartModel.lockCart(tx, cartId)
	if err != nil {
		tx.Rollback()
		return err
	}
	if cart == nil {
		tx.Rollback()
		return nil
	}

	var qty int
	err = tx.QueryRow(`select quantity from cartproduct where cartId = ? and productCode = ? and isOrdered = ? for update;`, cartId, productCode, false).Scan(&qty)
	if err != nil {
		tx.Rollback()
		if err == sql.ErrNoRows {
			return nil
		}
		return err
	}

	_, err = tx.Exec(`update product set availableQuantity = availableQuantity + ? where code = ?;`, qty, productCode)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec(`delete from cartproduct where cartId = ? and productCode = ?;`, cartId, productCode)
	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit();
	if err != nil {
		tx.Rollback()
		return err
	}
	return nil
}

func newCartProductModel() *modelCartProduct {
	return &modelCartProduct{}
}
