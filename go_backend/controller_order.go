package main

import(
	"fmt"
	"net/http"
)

type controllerOrder struct{

}

// func(c *controllerOrder) getOrderDetails(w http.ResponseWriter, req *http.Request) {
// }

func(c *controllerOrder) confirmOrder(w http.ResponseWriter, req *http.Request) {
	cartModel := newCartModel()
	cart, err := cartModel.getCartBySession(req.Header.Get("sessionId"))
	if err != nil {
		// send 500 error
		httpServerError(w, req)
		return
	}
	if cart == nil {
		httpNotFound(w, req)
		return
	}

	orderModel := newOrderModel()
	err = orderModel.confirmOrder(cart.Id, req.Header.Get("sessionId"))
	if err != nil {
		// send 500 error
		fmt.Println("err is-----", err)
		httpServerError(w, req)
		return
	}

	json_data := make(map[string]bool)
	json_data["acknoledge"] = true

	sendHttpResponse(w, json_data)
}

func(c controllerOrder) ServeHTTP(w http.ResponseWriter, req *http.Request) {

	// validate session

	fmt.Println("req is-----", req)
	switch req.Method {
		// case http.MethodGet:
		// 	c.getOrderDetails(w, req)
		case http.MethodPost:
			c.confirmOrder(w, req)
	}
}