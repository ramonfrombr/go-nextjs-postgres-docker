package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Task struct {
	Id 			int 	`json:"id"`
	Name 		string 	`json:"name"`
	Description	string 	`json:"description"`
	Status 		string 	`json:"status"`
	Priority 	string 	`json:"priority"`
	DueDate 	string 	`json:"dueDate"`
}

// main function
func main() {
	// connect to database
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	_, err = db.Exec("CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, name TEXT, description TEXT, status TEXT, priority TEXT, dueDate TIMESTAMP not null)")
	if err != nil {
		log.Fatal(err)
	}
	
	router := mux.NewRouter()

	// TASKS
	router.HandleFunc("/api/go/tasks", getTasks(db)).Methods("GET")
	router.HandleFunc("/api/go/tasks", createTask(db)).Methods("POST")
	router.HandleFunc("/api/go/tasks/{id}", getTask(db)).Methods("GET")
	router.HandleFunc("/api/go/tasks/{id}", updateTask(db)).Methods("PUT")
	router.HandleFunc("/api/go/tasks/{id}", deleteTask(db)).Methods("DELETE")

	// wrap the router with CORS and JSON content type middlewares
	enhancedRouter := enableCORS(jsonContentTypeMiddleware(router))
	
	// start the server
	log.Fatal(http.ListenAndServe(":8000", enhancedRouter))
}

func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Check if the request is for CORS preflight
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		// Pass down the request to the next middleware (or final handler)
		next.ServeHTTP(w, r)
	})
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set JSON Content-Type
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}

func getTasks(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT * FROM tasks")
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		tasks := []Task{}
		for rows.Next() {
			var t Task
			if err := rows.Scan(&t.Id, &t.Name, &t.Description, &t.Status, &t.Priority, &t.DueDate); err != nil {
				log.Fatal(err)
			}
			tasks = append(tasks, t)
		}

		if err := rows.Err(); err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(tasks)
	}
}

func createTask(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var t Task
		json.NewDecoder(r.Body).Decode(&t)

		err := db.QueryRow("INSERT INTO tasks (name, description, status, priority, dueDate) VALUES ($1, $2, $3, $4, $5) RETURNING id", t.Name, t.Description, t.Status, t.Priority, t.DueDate).Scan(&t.Id)
		
		if err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(t)
	}
}

func getTask(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		var t Task
		err := db.QueryRow("SELECT * FROM tasks WHERE id = $1", id).Scan(&t.Id, &t.Name, &t.Description, &t.Status, &t.Priority, &t.DueDate)

		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		}

		json.NewEncoder(w).Encode(t)
	}
}

func deleteTask(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		vars := mux.Vars(r)
		id := vars["id"]

		var t Task
		err := db.QueryRow("SELECT * FROM tasks WHERE id = $1", id).Scan(&t.Id, &t.Name, &t.Description, &t.Status, &t.Priority, &t.DueDate)
		if err != nil {
			w.WriteHeader(http.StatusNotFound)
			return
		} else {
			_, err := db.Exec("DELETE FROM tasks WHERE id = $1", id)
			if err != nil {
				w.WriteHeader(http.StatusNotFound)
				return
			}

			json.NewEncoder(w).Encode("Task deleted")
		}
	}
}

func updateTask(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var t Task
		json.NewDecoder(r.Body).Decode(&t)

		vars := mux.Vars(r)
		id := vars["id"]

		_, err := db.Exec("UPDATE tasks SET name = $1, description = $2, status = $3, priority = $4, dueDate = $5 WHERE id = $6", t.Name, t.Description, t.Status, t.Priority, t.DueDate, id)
		if err != nil {
			log.Fatal(err)
		}

		var updatedTask Task
		err = db.QueryRow("SELECT id, name, description, status, priority, dueDate FROM tasks WHERE id = $1", id).Scan(&updatedTask.Id, &updatedTask.Name, &updatedTask.Description, &updatedTask.Status, &updatedTask.Priority, &updatedTask.DueDate)
		if err != nil {
			log.Fatal(err)
		}

		json.NewEncoder(w).Encode(updatedTask)
	}
}