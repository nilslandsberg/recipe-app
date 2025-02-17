import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "../app.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

const SearchResults = () => {
  // component that renders the recipe query results
  const recipeData = useSelector((state) => state.recipeData);
  const setLoading = useSelector((state) => state.setLoading);
  const navigate = useNavigate();

  // overrides pacman loading spinner styles
  const override: CSSProperties = {
    margin: "100px 200px",
  };

  // function that renders recipe query results to the page
  const renderRecipes = () => {
    // error handling if user input doesn't retrieve recipes from API
    if (recipeData && recipeData.results.length === 0) {
      alert("Please select another food item");
      navigate("/");
    }

    // logic for when user input does retrieve recipes from API
    if (!_.isEmpty(recipeData)) {
      return recipeData.results.map((recipe) => (
        <LinkContainer to={`/search/${recipe.id}`} key={recipe.id}>
          <Col className="mb-4 mt-4 d-flex align-items-stretch">
            <Card className="recipe-card" style={{ width: "18rem" }}>
              {recipe.image ? (
                <Card.Img
                  variant="top"
                  src={`${recipe.image}`}
                  alt={recipe.title}
                />
              ) : (
                <span></span>
              )}
              <Card.Body className="text-center">
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>Servings: {recipe.servings}</Card.Text>
                <Card.Text>Ready in {recipe.readyInMinutes} minutes</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </LinkContainer>
      ));
    }
  };

  return (
    <>
      <Container className="show-random-recipe text-center m-4">
        <Row className="show-recipe">
          {setLoading ? (
            <PacmanLoader color="#14A44D" size="150px" cssOverride={override} />
          ) : (
            renderRecipes()
          )}
        </Row>
      </Container>
    </>
  );
};

export default SearchResults;
