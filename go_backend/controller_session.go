package main

import(
	"fmt"
	"net/http"
)

type controllerSession struct{

}

func(c *controllerSession) getSessionDetails(w http.ResponseWriter, req *http.Request) {
	sessionModel := newSessionModel()
	session, err := sessionModel.getSession(req.Header.Get("sessionId"))
	if err != nil {
		// send 500 error
		fmt.Println("err is-----", err)
		httpServerError(w, req)
		return
	}

	if session == nil {
		httpNotFound(w, req)
		return
	}

	sendHttpResponse(w, session)
}

func(c *controllerSession) createSession(w http.ResponseWriter, req *http.Request) {
	sessionModel := newSessionModel()
	session, err := sessionModel.createSession()
	if err != nil {
		// send 500 error
		fmt.Println("err is-----", err)
		httpServerError(w, req)
		return
	}
	sendHttpResponse(w, session)
}

func(c controllerSession) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	fmt.Println("req is-----", req)
	switch req.Method {
		case http.MethodGet:
			c.getSessionDetails(w, req)
		case http.MethodPost:
			c.createSession(w, req)
	}
}