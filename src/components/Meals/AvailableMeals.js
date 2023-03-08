import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useCallback, useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [mealList, setMealList] = useState([]);

  const fetchMeals = useCallback(async () => {
    try {
      const res = await fetch(
        "https://react-2417f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );
      if (!res.ok) throw new Error("Unable to connect to database");
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

      setMealList(loadedMeals);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  const mealsList = mealList.map((meal) => (
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
