import React, { Component} from 'react'


class App extends Component {
  constructor() {
    super();
    this.state = {
      _id: '',
      title: "",
      description: "",
      tasks: [],
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addTask(e) {
    
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        } 
      })
        .then(res => res.json())
        .then( data => {
          console.log(data)
          M.toast({ html: 'Tarea actualizada!'})
          this.setState({ _id: "", title: "", description: "" });
          this.fetchTasks();
        })
          .catch( err => console.log(err))

    }else{
      fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(data => {
          console.log(data)
          M.toast({ html: "Tarea guardada!" })
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch((err) => console.log(err));

    }

    e.preventDefault();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      });
  }

  deleteTask(id) {
    if (confirm("Estás seguro de eliminar esta tarea?")) {
      fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          this.fetchTasks();
          M.toast({ html: "Tarea eliminada!" });
        })
        .catch((err) => console.log(err));
    }
  }

  editTask(id) {
    fetch(`/api/tasks/${id}`)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        this.setState({
          _id: data._id,
          title: data.title,
          description: data.description
        })
      })
      .catch((err) => console.log(err))
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              Tareas
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field">
                        <input
                          name="title"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Título de la tarea"
                          value={this.state.title}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field">
                        <textarea
                          name="description"
                          onChange={this.handleChange}
                          placeholder="Descripción de la tarea"
                          className="materialize-textarea"
                          value={this.state.description}
                        ></textarea>
                      </div>
                    </div>
                      {
                       this.state._id ? <button className="btn light-blue darken-4">Editar</button> : <button className="btn light-blue darken-4">Enviar</button>
                      }
                  </form>
                </div>
              </div>
            </div>

            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map((task) => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button onClick={() => this.editTask(task._id)} className="btn light-blue darken-4">
                            <i className="tiny material-icons">edit</i>
                          </button>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => {
                              this.deleteTask(task._id);
                            }}
                          >
                            <i className="tiny material-icons">delete</i>
                          </button>
                        </td>
                        <td></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;