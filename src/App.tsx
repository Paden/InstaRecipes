import React from 'react';
import './App.css';
import instacartPng from './instacart.png';
import { FormGroup, Label, ListGroup, ListGroupItem, Row, Col, Button } from 'reactstrap';

const App: React.FC = () => {
  const [recipeItems, setRecipeItems] = React.useState<string[]>([]);
  const onTextAreaPaste = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = evt.currentTarget;

    const recipeItems = value
      .split(/\n/gi)
      .map((recipeItem) => recipeItem.trim())
      .filter((recipeItem) => recipeItem.length > 0);

    setRecipeItems(recipeItems);
  }

  const sendToInstacart = () => {
    let instacartUrl = 'https://www.instacart.com/store/partner_recipe?';
    const urlParam = encodeURIComponent('ingredients[]');

    for(const recipeItem of recipeItems) {
      instacartUrl += `&${urlParam}=${recipeItem}`;
    }

    window.open(instacartUrl);
  }

  return (
    <div className="container-fluid mt-5">
      <Row>
        <Col md={4}>
          <FormGroup>
            <Label>1. Paste Recipe List</Label>
            <textarea 
              className="form-control" 
              rows={10} 
              onChange={(evt) => onTextAreaPaste(evt)}
            />
          </FormGroup>
        </Col>
        {recipeItems.length > 0 &&
          <>
            <Col md={4}>
              <Label>2. Recipe Items</Label>
              <ListGroup>
                {recipeItems.map((recipeItem) =>
                  <ListGroupItem key={recipeItem}>
                    {recipeItem}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Col>
            <Col md={4}>
              <Button onClick={() => sendToInstacart()}
                className="bg-white border-success text-success shadow-sm"
                size="lg">
                <span>3. Order on </span>
                <img 
                  src={instacartPng} 
                  width="100" 
                  className="d-inline-block" 
                  alt="Instacart Logo"
                />
              </Button>
            </Col>
          </>
        }
      </Row>
    </div>
  );
}

export default App;
