package main

import (
	// "fmt"
	// "net"
	// "sync"
	// "time"
	"database/sql"
)

type session struct {
	// Id int `json:"id"`
	Sid string `json:"sessionId"`
	Status string `json:"status"`
}

var sampleSession = &session{
	// Id: 1,
	Sid: "sessionid1",
	Status: "active",
}

type modelSession struct{

}

func(m *modelSession) createSession() (*session, error) {
	ss := &session{
		// Id: 1,
		Sid: randString(),
		Status: "active",
	}
	stmt, err := DB.Prepare(`insert into session(sid, status) values (?, ?);`)
	if err != nil {
		return nil, err
	}
	result, err := stmt.Exec(ss.Sid, ss.Status)
	if err != nil {
		return nil, err
	}
	result.LastInsertId();

	return ss, nil
}

func(m *modelSession) getSession(sessionId string) (*session, error) {
	var ss session
	err := DB.QueryRow(`select sid, status from session where sid = ?`, sessionId).Scan(&ss.Sid, &ss.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}
	return &ss, nil
}

func newSessionModel() *modelSession {
	return &modelSession{}
}
