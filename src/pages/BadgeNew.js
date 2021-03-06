import React from "react";
import "./styles/BadgeNew.css";
import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import PageLoading from "../components/PageLoading";
import api from "../api";
import avatar from "../images/avatar.svg";

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      nickname: "",
      description: "",
    },
  };

  handleChange = (e) => {
    /* Metodo 1 para que no se reseteen los estados
    const nextForm = this.state.form;
    nextForm[e.target.name] = e.target.value;
    this.setState({w
      form: nextForm,
    });*/

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await api.badges.create({
        id: `${this.getRandomInt(104544, 2345765)}`,
        firstName: this.state.form.firstName,
        lastName: this.state.form.lastName,
        jobTitle: this.state.form.description,
        twitter: this.state.form.nickname,
        avatarUrl: avatar,
      });
      this.setState({ loading: false });
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  render() {
    return (
      <>
        <div className="badge-new">
          <div className="badge-new__badge">
            <Badge
              name={this.state.form.firstName || "Fist Name"}
              lastName={this.state.form.lastName || "Last Name"}
              description={
                this.state.form.description || "Job title or description"
              }
              user={this.state.form.nickname || "@nickname"}
            />
          </div>
          <div className="badge-new__form">
            {!this.state.loading && (
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formTitle={"Sign Up"}
                formValues={this.state.form}
                error={this.state.error}
              />
            )}
            {this.state.loading && <PageLoading />}
          </div>
        </div>
      </>
    );
  }
}

export default BadgeNew;
