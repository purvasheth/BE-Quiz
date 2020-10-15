import React from "react";
import Papa from "papaparse";
import Display from "./Display";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      csvfile: undefined,
      data: undefined,
      error: 0,
    };
    this.updateData = this.updateData.bind(this);
  }

  handleChange = (event) => {
    const file = event.target.files[0];
    const err_code = file.type.includes("csv") ? 0 : 2;
    this.setState({
      csvfile: file,
      error: err_code,
    });
  };

  importCSV = () => {
    const { csvfile } = this.state;
    if (csvfile) {
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true,
      });
    } else {
      this.setState({ error: 1 });
    }
  };

  updateData(result) {
    const initialData = result.data;
    const size = initialData.length;
    const data = initialData.slice(0, size - 1);
    this.setState({ data });
  }

  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          <h2>Import CSV File</h2>
          <input
            className="csv-input"
            type="file"
            ref={(input) => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV} style={{cursor: "pointer"}}> Upload </button>

          <p style={{ color: "red" }}>
            {this.state.error > 0 &&
              (this.state.error === 1
                ? "Please select file first"
                : "Only CSV file will work")}
          </p>
        </div>
        <Display
          data={this.state.data}
          filename={this.state.csvfile ? this.state.csvfile.name : ".csv"}
        />
        <div
          className="footer"
          style={{
            position: !this.state.data && "fixed",
          }}
        >
          Made by Purva Sheth &nbsp;&nbsp; Contact Me:+91-7798546975 |
          purvashet@gmail.com |{" "}
          <a href="https://linkedin.com/in/purva-sheth-41938a167">LinkedIn</a> |{" "}
          <a href="https://github.com/purvasheth">GitHub</a>
        </div>
      </div>
    );
  }
}

export default App;
