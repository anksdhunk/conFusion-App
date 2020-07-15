import React, { Component } from "react";
import Menu from "./MenuComponent";
import Header from "./HeaderComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import DishDetail from "./DishdetailComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { addComment, fetchDishes } from "./../redux/ActionCreators";

//we need action creator to obtain the javascript action object, which we can dispatch to store by dispatch()

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    leaders: state.leaders,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = (dispatch) => ({
  //addComment property, this will dispatch the action, to obtain the action, we'll use addComment action creator and properties are passed as params
  addComment: (dishId, ratinng, author, comment) =>
    dispatch(addComment(dishId, ratinng, author, comment)),
  fetchDishes: () => {dispatch(fetchDishes())}
  // map fetch dishes to props, create new property fetchDishes which when invoked result in a call to dispatch fetchDishes function(thunk)
});

class Main extends Component {
  constructor(props) {
    super(props);
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  componentDidMount() {
    this.props.fetchDishes();
    //when the main component is being mounted into the view, at this point it will call fetchDishes
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          // the shape of dishes object has changed, here the state is dishes, and the state.dishes object already has the 3 properties, we need to select the 3rd one for dishes state, therefore this.props.dishes.dishes
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const AboutPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          dishesLoading = {this.props.dishes.isLoading}
          dishesErrMess = {this.props.dishes.errMess}
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          addComment={this.props.addComment}
        />
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route path="/aboutus" component={AboutPage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/contactus" component={Contact} />
          <Redirect exact from="/" to="home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
