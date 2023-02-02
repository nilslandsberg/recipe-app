import { useSelector, useDispatch } from "react-redux";
import { fetchRecipeInfo } from "../actions";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import '../app.css';
import {  Card, Container, Row, Col } from "react-bootstrap";
import _ from 'lodash';

const ShowRecipe = () => {
  const recipeData = useSelector(state => state.recipeData);
  const dispatch = useDispatch();

  const baseUri = "https://spoonacular.com/recipeImages/";
  
  const handleRecipeClick = (id) => {
    dispatch(fetchRecipeInfo(id));
    // route to individual recipe/id page for more info?
  }

  const renderRecipes = () => {
    if (!_.isEmpty(recipeData)) {
      return recipeData.results.map((recipe) =>
      <Col className="mb-4 md-4 d-flex align-items-stretch">
        <Card className="recipe-card" style={{ width: '18rem' }} key={recipe.id}>
          <a href={recipe.sourceUrl} className="text-reset text-decoration-none">
          {recipe.image ? <Card.Img 
            variant="top" 
            src={`${baseUri}${recipe.image}`} 
            alt={recipe.title} /> : <span></span>}
          <Card.Body className="text-center">
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>Servings: {recipe.servings}</Card.Text>
            <Card.Text>Ready in {recipe.readyInMinutes} minutes</Card.Text>
          </Card.Body>
          </a>
        </Card>
      </Col>
      )
    }  
  };

  return (
    <>
      <Container className="show-random-recipe text-center">
        <Row className="show-recipe">
          {renderRecipes()}
          </Row>
      </Container>
    </>
  )


  // return (
  //   <div className="show-recipe row">
  //     {recipeData && recipeData.results.map((result) =>
  //     <div className=" card col-md-6  col-lg-4 p-2" key={result.id}>
  //       <img className="card-img-top" src={`${baseUri}${result.image}`} alt="recipe pic" />
  //       <div className="card-body">
  //         <h4 className="card-title">{`${result.title}`}</h4>
  //         <a style={{color: "green", textDecoration: 'none'}} href={result.sourceUrl}><strong>Recipe</strong></a>
  //         <p className="m-1" >Servings: {result.servings}</p>
  //         <p>Ready in {result.readyInMinutes} minutes</p>
  //       </div>
  //     </div> 
  //     )}
  //   </div>
  // );
}
 
export default ShowRecipe;