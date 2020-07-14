import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { addComment } from './../redux/ActionCreators';

const required = (val) => val && val.length;
const minlen = (len) => (val) => !val || (val.length >= len);
const maxlen = (len) => (val) => !val || (val.length <= len);

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  toggleModal() {
    this.setState(prevState => ({
        showModal: !prevState.showModal
    }));
}

  handleSubmit(values) {
    this.toggleModal();
    this.props.addComment(this.props.dishId, values.rating,values.author, values.comment);
    
  }

  render() {
    return (
      <React.Fragment>
        <Button color = "secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.showModal} toggle = {this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Submit Comment
          </ModalHeader>

          <ModalBody className="m-3">
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating</Label>
                <Control.select
                  model=".rating"
                  id="rating"
                  name="rating"
                  className="form-control"
                  defaultValue = {1}
                >
                  <option value = "1">1</option>
                  <option value = "2">2</option>
                  <option value = "3">3</option>
                  <option value = "4">4</option>
                  <option value = "5">5</option>
                </Control.select>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  className="form-control"
                  validators={{
                    required,
                    minlen: minlen(3),
                    maxlen: maxlen(15),
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  messages={{
                    required: "Required ",
                    minlen: "Must be greater than 2 characters",
                    maxlen: "Must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  model=".comment"
                  name="comment"
                  className="form-control"
                  rows = "6"
                />
              </Row>
              <Row className="form-group">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderComments({ comments, addComment,dishId }) {
  if (comments != null) {
    const cmt = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>-- {comment.author}, 
          &nbsp;
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          }).format(new Date(comment.date))}
          </p>
        </li>
      );
    });

    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{cmt}</ul>
        <CommentForm dishId = {dishId} addComment = {addComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderDish({ dish }) {
  if (dish == null) return <div></div>;
  if (dish != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100" src={dish.image} alt={dish.name} />

          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish == null) return <div></div>;
  else {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} 
          addComment = {props.addComment}
          dishId = {props.dish.id}/>
        </div>
      </div>
    );
  }
};

export default DishDetail;
