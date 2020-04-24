package main

import(
	"fmt"
	"net/http"
)

type controllerCart struct{

}

func(c *controllerCart) addToCart(w http.ResponseWriter, req *http.Request) {
	var(
		isAllocated bool
		err error
	)
	data := make(map[string]int)
	err = parseJsonBody(req, &data)
	if err != nil {
		errData := map[string]string{
			"error": "unable to parse Request body",
		}
		httpClientError(w, errData)
		return
	}
	qty, ok := data["quantity"]
	if !(ok && qty <= maxCartProduct) {
		errData := map[string]string{
			"error": "Error in quantity.. Quantity more than 10",
		}
		httpClientError(w, errData)
		return
	}

	cartModel := newCartModel()
	cart, err := cartModel.getCartBySession(req.Header.Get("sessionId"))
	if err != nil {
		// send 500 error
		httpServerError(w, req)
		return
	}

	uVars := uriVars(req)
	cartProductModel := newCartProductModel()

	if cart == nil {
		// create cart
		cart, err = cartModel.createFreshCart(req.Header.Get("sessionId"))
		if err != nil {
			// send 500 error
			httpServerError(w, req)
			return
		}
		isAllocated, err = cartProductModel.addCartProduct(cart.Id, uVars["productCode"], qty)
	} else {
		var cartProduct *cartproduct
		cartProduct, err = cartProductModel.getCartProduct(cart.Id, uVars["productCode"])
		if err != nil {
			// send 500 error
			httpServerError(w, req)
			return
		}

		if cartProduct == nil {
			isAllocated, err = cartProductModel.addCartProduct(cart.Id, uVars["productCode"], qty)
		} else {
			if maxCartProduct < cartProduct.Quantity + qty {
				errData := map[string]string{
					"error": "Error in quantity.. Quantity more than 10",
				}
				httpClientError(w, errData)
				return
			}
			isAllocated, err = cartProductModel.increaseProductQuantity(cart.Id, uVars["productCode"], qty)
		}
	}

	if err != nil {
		// send 500 error
		fmt.Println("err--", err)
		httpServerError(w, req)
		return
	}

	if !isAllocated {
		// send 400 error
		errData := map[string]string{
			"error": "Quantity not available!!",
		}
		httpClientError(w, errData)
		return
	}

	json_data := make(map[string]bool)
	json_data["acknoledge"] = true

	sendHttpResponse(w, json_data)

}

func(c *controllerCart) changeProductQuantity(w http.ResponseWriter, req *http.Request) {
	data := make(map[string]int)
	err := parseJsonBody(req, &data)
	if err != nil {
		errData := map[string]string{
			"error": "unable to parse Request body",
		}
		httpClientError(w, errData)
		return
	}
	qty, ok := data["quantity"]
	if !(ok && qty <= maxCartProduct) {
		errData := map[string]string{
			"error": "Error in quantity.. Quantity more than 10",
		}
		httpClientError(w, errData)
		return
	}

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

	uVars := uriVars(req)

	cartProductModel := newCartProductModel()
	cartProduct, err := cartProductModel.getCartProduct(cart.Id, uVars["productCode"])
	if err != nil {
		// send 500 error
		httpServerError(w, req)
		return
	}
	if cartProduct == nil {
		httpNotFound(w, req)
		return
	}

	switch {
		case qty < cartProduct.Quantity:
			err = cartProductModel.reduceProductQuantity(cart.Id, uVars["productCode"], cartProduct.Quantity-qty)
		case qty > cartProduct.Quantity:
			var isAllocated bool
			isAllocated, err = cartProductModel.increaseProductQuantity(cart.Id, uVars["productCode"], qty-cartProduct.Quantity)
			if !isAllocated {
				// send 400 error
				errData := map[string]string{
					"error": "Quantity not available!!",
				}
				httpClientError(w, errData)
				return
			}
	}

	if err != nil {
		// send 500 error
		fmt.Println(err)
		httpServerError(w, req)
		return
	}

	json_data := make(map[string]bool)
	json_data["acknoledge"] = true

	sendHttpResponse(w, json_data)
}

func(c *controllerCart) removeFromCart(w http.ResponseWriter, req *http.Request) {
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

	cartProductModel := newCartProductModel()
	uVars := uriVars(req)
	err = cartProductModel.deleteCartProduct(cart.Id, uVars["productCode"])
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

func(c *controllerCart) getCartProducts(w http.ResponseWriter, req *http.Request) {
	cartModel := newCartModel()
	cart, err := cartModel.getCartBySession(req.Header.Get("sessionId"))
	if err != nil {
		// send 500 error
		httpServerError(w, req)
		return
	}

	json_data := make(map[string][]cartproduct)
	json_data["products"] = []cartproduct{}

	if cart != nil {
		cartProductModel := newCartProductModel()
		cartProducts, err := cartProductModel.getCartProducts(cart.Id)
		if err != nil {
			// send 500 error
			httpServerError(w, req)
			return
		}
		json_data["products"] = cartProducts
	}

	// return json cartProducts
	sendHttpResponse(w, json_data)
}

func(c controllerCart) ServeHTTP(w http.ResponseWriter, req *http.Request) {

	// validate session

	fmt.Println("req is-----", req)
	switch req.Method {
		case http.MethodGet:
			c.getCartProducts(w, req)
		case http.MethodPost:
			c.addToCart(w, req)
		case http.MethodPut:
			c.changeProductQuantity(w, req)
		case http.MethodDelete:
			c.removeFromCart(w, req)
	}
}