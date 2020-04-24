package main

import(
	"fmt"
	"net/http"
)

type controllerProduct struct{

}

func(c controllerProduct) ServeHTTP(w http.ResponseWriter, req *http.Request) {

	productModel := newProductModel()
	products, err := productModel.findProducts()

	fmt.Println("products-----", products, err)

	if err != nil {
		// send 500 error
		httpServerError(w, req)
		return
	}

	sendHttpResponse(w, products)
}
