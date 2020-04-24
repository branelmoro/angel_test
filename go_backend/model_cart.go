package main

import (
	// "fmt"
	// "net"
	// "sync"
	// "time"
	"database/sql"
)

type cart struct {
	Id int `json:"id"`
	SessionId string `json:"sessionId"`
	Status string `json:"status"`

	// qtyLock sync.Mutex
}

// var sampleCart = &cart{
// 	Id: 1,
// 	SessionId: "abcd",
// 	Status: "ordered",
// }

type modelCart struct{

}

func(m *modelCart) createFreshCart(sessionId string) (*cart, error) {
	crt := &cart{
		SessionId: sessionId,
		Status: "active",
	}
	stmt, err := DB.Prepare(`insert into cart(sessionId, status) values (?, ?);`)
	if err != nil {
		return nil, err
	}
	result, err := stmt.Exec(crt.SessionId, crt.Status)
	if err != nil {
		return nil, err
	}
	
	id, err := result.LastInsertId();
	if err != nil {
		return nil, err
	}
	crt.Id = int(id)
	return crt, nil
}

func(m *modelCart) getCartBySession(sessionId string) (*cart, error) {
	var crt cart
	err := DB.QueryRow(`select * from cart where sessionId = ? and status = ?`, sessionId, "active").Scan(&crt.Id, &crt.SessionId, &crt.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &crt, nil
}

func(m *modelCart) lockCart(tx *sql.Tx, cartId int) (*cart, error) {
	// lock cart so that not other operations can't be performed on cart
	var crt cart
	err := tx.QueryRow(`select * from cart where id = ? for update;`, cartId).Scan(&crt.Id, &crt.SessionId, &crt.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &crt, nil
}

func newCartModel() *modelCart {
	return &modelCart{}
}
