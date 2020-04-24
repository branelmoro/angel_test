package main

import (
	// "fmt"
	"net/http"
	"github.com/gorilla/mux"
)

type NotFoundHandler bool
func(c NotFoundHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	httpNotFound(w,req)
}

type MethodNotAllowedHandler bool
func(c MethodNotAllowedHandler) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	httpMethodNotAllowed(w,req)
}

func router() http.Handler {

	handler := mux.NewRouter()

	handler.NotFoundHandler = NotFoundHandler(true)
	handler.MethodNotAllowedHandler = MethodNotAllowedHandler(true)

	handler.Use(
		func(next http.Handler) http.Handler {
			return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
				w.Header().Set("Access-Control-Allow-Origin", "*")
				next.ServeHTTP(w, req)
			})
		},
	)

	authMiddleware := func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, req *http.Request) {
			sid := req.Header.Get("sessionId")
			if sid != "" {
				sessionModel := newSessionModel()
				session, err := sessionModel.getSession(req.Header.Get("sessionId"))
				if session != nil {
					handler.ServeHTTP(w, req)
					return
				}
				if err != nil {
					// send 500 error
					httpServerError(w, req)
					return
				}
			}
			httpUnauthorized(w, req)
		})
	}

	handler.Handle("/session", controllerSession{}).Methods("POST")
	handler.Handle("/session/", controllerSession{}).Methods("POST")
	handler.Handle("/session", authMiddleware(controllerSession{})).Methods("GET")
	handler.Handle("/session/", authMiddleware(controllerSession{})).Methods("GET")

	handler.Handle("/products", authMiddleware(controllerProduct{})).Methods("GET")

	handler.Handle("/cart", authMiddleware(controllerCart{})).Methods("GET")
	handler.Handle("/cart/add/{productCode}", authMiddleware(controllerCart{})).Methods("POST")
	handler.Handle("/cart/changeQty/{productCode}", authMiddleware(controllerCart{})).Methods("PUT")
	handler.Handle("/cart/remove/{productCode}", authMiddleware(controllerCart{})).Methods("DELETE")

	// handler.Handle("/order/{orderId}", controllerOrder{}).Methods("GET")
	handler.Handle("/confirmOrder", authMiddleware(controllerOrder{})).Methods("POST")

	// to allow CORS(Cross Origin Resource Sharing)
	handler.Use(mux.CORSMethodMiddleware(handler))
	for _, path := range []string{
		"/session",
		"/session/",
		"/products",
		"/cart",
		"/cart/add/{productCode}",
		"/cart/changeQty/{productCode}",
		"/cart/remove/{productCode}",
		"/confirmOrder",
	} {
		handler.HandleFunc(path, func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "content-type,sessionid")
			w.Header().Set("Access-Control-Max-Age", "86400")
		}).Methods(http.MethodOptions)
	}

	return handler
}
