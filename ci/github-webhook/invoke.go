package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
)

func handler(w http.ResponseWriter, r *http.Request) {
	cmd := exec.CommandContext(r.Context(), "/bin/bash", "script.sh")
	cmd.Stderr = os.Stderr
	out, err := cmd.Output()
	if err != nil {
		log.Print(err)
		log.Print("Error")
		w.WriteHeader(500)
	}
	log.Print("Printing")
	w.Write(out)
}

func main() {
	http.HandleFunc("/", handler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}
