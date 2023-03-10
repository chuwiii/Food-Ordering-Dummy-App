import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://react-2417f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!res.ok) {
        throw new Error("Unable to connect to database");
      }
      const data = await res.json();
      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          key: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setHttpError(err.message);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p className={classes.MealsLoading}>Loading...</p>;
  }

  if (error) {
    return <p className={classes.MealsError}>{error}</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
