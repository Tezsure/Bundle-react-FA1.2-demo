import React, { Component } from "react";
import { TezosNodeWriter, TezosParameterFormat } from "conseiljs";
import "./App.css";

// Key manager
var key_name = "test_key1";
var key = require(`../../keystore/${key_name}`);

// App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      wallet: key.publicKeyHash,
      address: "",
      amount: "",
      amount_t: "",
      from: "",
      to: "",
      latest_Og: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.mintToken = this.mintToken.bind(this);
    this.transferToken = this.transferToken.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async mintToken() {
    console.log(this.state.address, this.state.amount);

    var tezosNode = "https://testnet.tezster.tech",
      keystore = key,
      contractAddress = "KT1QZzfxr4jFSXi3J4jR2w9VCP1DKG7zPMck",
      amount = 1,
      fee = 100000,
      storage_limit = 1000,
      gas_limit = 200000,
      entry_point = undefined,
      parameters = `(Right (Left (Right (Pair "${this.state.address}" ${this.state.amount}))))`,
      derivation_path = "";

    // TezosNodeWriter is responsible for writing in the Tezos Blockchain and costs GAS
    const result = await TezosNodeWriter.sendContractInvocationOperation(
      tezosNode,
      keystore,
      contractAddress,
      amount,
      fee,
      derivation_path,
      storage_limit,
      gas_limit,
      entry_point,
      parameters,
      TezosParameterFormat.Michelson
    );

    this.setState({ latest_Og: result.operationGroupID });
    alert(
      `Injected operation ! \n Invocation Group ID : ${result.operationGroupID}`
    );
  }

  async transferToken() {
    console.log(this.state.address, this.state.amount);

    var tezosNode = "https://testnet.tezster.tech",
      keystore = key,
      contractAddress = "KT1QZzfxr4jFSXi3J4jR2w9VCP1DKG7zPMck",
      amount = 1,
      fee = 100000,
      storage_limit = 1000,
      gas_limit = 200000,
      entry_point = undefined,
      parameters = `(Right (Right (Right (Right (Pair ${this.state.amount_t} (Pair "${this.state.from}" "${this.state.to}"))))))`,
      derivation_path = "";

    console.log(parameters);
    // TezosNodeWriter is responsible for writing in the Tezos Blockchain and costs GAS
    const result = await TezosNodeWriter.sendContractInvocationOperation(
      tezosNode,
      keystore,
      contractAddress,
      amount,
      fee,
      derivation_path,
      storage_limit,
      gas_limit,
      entry_point,
      parameters,
      TezosParameterFormat.Michelson
    );

    console.log(result.operationGroupID);
    this.setState({ latest_Og: result.operationGroupID });
    alert(
      `Injected operation ! \n Invocation Group ID : ${result.operationGroupID}`
    );
  }

  render() {
    return (
      <div className="container">
        <h1 className="navbar navbar-expand-lg navbar-light bg-light">
          {" "}
          FA 1.2 Interaction | Demo
        </h1>
        <br />
        <p>Wallet Address Detected : {this.state.wallet}</p>
        <p> Latest Operation Group ID : {this.state.latest_Og}</p>

        <h3>Mint Token</h3>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
              Address
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Address</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="tz1.*"
                value={this.state.address}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only">Amount</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Token Count</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Number"
                value={this.state.amount}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.mintToken}
            >
              Mint
            </button>
          </div>
        </div>
        <br />

        <p> Token minted for : {this.state.address}</p>
        <p> Token Count : {this.state.amount}</p>

        <br />
        <h3>Transfer</h3>
        <div className="form-row align-items-center">
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
              Amount
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">Amount</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="amount_t"
                name="amount_t"
                placeholder="Number"
                value={this.state.amount_t}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only">From</label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">From</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="from"
                name="from"
                placeholder="Address tz1*"
                value={this.state.from}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">
              To
            </label>
            <div className="input-group mb-2">
              <div className="input-group-prepend">
                <div className="input-group-text">To</div>
              </div>
              <input
                type="text"
                className="form-control"
                id="to"
                name="to"
                placeholder="Address tz1.*"
                value={this.state.to}
                onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              className="btn btn-primary mb-2"
              onClick={this.transferToken}
            >
              Transfer
            </button>
          </div>
        </div>
        <br />
        <p> Amount : {this.state.amount_t}</p>
        <p> Token Transfer from : {this.state.from}</p>
        <p> Token Transfer to : {this.state.to}</p>

        <br />
      </div>
    );
  }
}

export default App;
