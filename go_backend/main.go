package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func getConfig() (map[string]interface{}, error) {
	var config map[string]interface{}
	configContent, err := ioutil.ReadFile("./config.json")
	if err != nil {
		panic(err)
	}
	if err = json.Unmarshal(configContent, &config); err != nil {
		panic(err)
	}
	return config, err
}

func startApiServer(c interface{}) {

	if config, ok := c.(map[string]interface{}); ok {

		handler := router()

		host, _ := config["host"].(string)
		port, _ := config["port"].(float64)

		addr := fmt.Sprintf("%s:%d", host, int(port))

		fmt.Println(addr);

		s := &http.Server{
			// Addr: fmt.Sprintf("%s:%d", host, port),
			Addr: addr,
			Handler: handler,
			// ReadTimeout:	10 * time.Second,
			// WriteTimeout:   10 * time.Second,
			// MaxHeaderBytes: 1 << 20,
		}
		log.Fatal(s.ListenAndServe())
	} else {
		fmt.Println("invalid config received!!!!!!!!!!", c)
	}

}

var DB *sql.DB

func initDatabseConnection(c interface{}) {

	if config, ok := c.(map[string]interface{}); ok {

		host, _ := config["host"].(string)
		port, _ := config["port"].(float64)
		username, _ := config["username"].(string)
		password, _ := config["password"].(string)
		database, _ := config["database"].(string)

		addr := fmt.Sprintf("%s:%s@tcp(%s:%d)/%s", username, password, host, int(port), database)

		db, err := sql.Open("mysql", addr)

		fmt.Println(addr, err, db)

		if err != nil {
			panic(err)
		}

		DB = db

		connctionPool, _ := config["connctionPool"].(float64)
		DB.SetMaxOpenConns(int(connctionPool))
		// DB.SetConnMaxLifetime(duration)
	}

}

func main() {
	// fmt.Println(dat)

	config, err := getConfig()

	if err == nil {

		// start all dependant services
		initDatabseConnection(config["mysqldb"])

		startApiServer(config["apiServer"])
	} else {
		fmt.Println(err)
	}

}