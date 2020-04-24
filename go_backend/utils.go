package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"github.com/gorilla/mux"

	"math/rand"
	"time"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
var seededRand *rand.Rand = rand.New(rand.NewSource(time.Now().UnixNano()))
func randString() string {
	b := make([]byte, 30)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func uriVars(r *http.Request) map[string]string {
	return mux.Vars(r)
}

func parseJsonBody(r *http.Request, v interface{}) error {
	return json.NewDecoder(r.Body).Decode(v)
}

func httpNotFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(404)
	_, err := w.Write([]byte(`{"error":"Resource Not Found"}`))
	if err != nil {
		// some error ocurred
		fmt.Println("404 err is not sent-----", err)
	}
}

func httpUnauthorized(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(401)
	_, err := w.Write([]byte(`{"error":"Unauthorized"}`))
	if err != nil {
		// some error ocurred
		fmt.Println("401 err is not sent-----", err)
	}
}

func httpMethodNotAllowed(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(405)
	_, err := w.Write([]byte(`{"error":"Method Not Found"}`))
	if err != nil {
		// some error ocurred
		fmt.Println("405 err is not sent-----", err)
	}
	// http.NotFound(w, r)
}

func httpServerError(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(500)
	_, err := w.Write([]byte(`{"error":"Something went wrong"}`))
	if err != nil {
		// some error ocurred
		fmt.Println("500 err is not sent-----", err)
	}
}

func sendHttpResponse(w http.ResponseWriter, data interface{}) error {
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(200)
	json_data, _ := json.Marshal(data)
	_, err := w.Write(json_data)
	if err != nil {
		// some error ocurred
		fmt.Println("Error occured in sending response -----", err)
	}
	return err
}

func httpClientError(w http.ResponseWriter, data interface{}) {
	w.WriteHeader(400)
	w.Header().Set("content-type", "application/json")
	sendHttpResponse(w, data)
}
