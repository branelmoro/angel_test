package main

import (
	// "fmt"
	// "net"
	// "sync"
	// "time"
)

type order struct {
	OrderId int `json:"orderId"`
	CartId int `json:"cartId"`
	SessionId int `json:"sessionId"`
	Status string `json:"status"`

	// qtyLock sync.Mutex
}

var sampleOrder = &order{
	OrderId: 1,
	CartId: 1,
	Status: "confirmed",
}


type modelOrder struct{

}

// func(m *modelOrder) findOrders() (*order, error) {
// 	return sampleOrder, nil
// }

func(m modelOrder) confirmOrder(cartId int, sessionId string) error {
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

	_, err = tx.Exec(`insert into orders (cartId, sessionId, status) values (?, ?, ?);`, cartId, sessionId, "ordered")
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec(`update cartproduct set isOrdered = ? where cartId = ?;`, true, cartId)
	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec(`update cart set status = "ordered" where id = ?;`, cartId)
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


func newOrderModel() *modelOrder {
	return &modelOrder{}
}
