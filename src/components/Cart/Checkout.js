import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isEmpty = (input) => input.trim() === "";
const isNotFiveChars = (input) => input.trim().length !== 5;

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    inputInvalid: enteredNameHasError,
    valueChangeHandler: nameInputChangeHandler,
    resetInput: resetName,
    inputBlurHandler: nameInputBlurHandler,
  } = useInput(isEmpty);

  const {
    enteredValue: enteredStreet,
    inputInvalid: enteredStreetHasError,
    valueChangeHandler: streetInputChangeHandler,
    resetInput: resetStreet,
    inputBlurHandler: streetInputBlurHandler,
  } = useInput(isEmpty);

  const {
    enteredValue: enteredCity,
    inputInvalid: enteredCityHasError,
    valueChangeHandler: cityInputChangeHandler,
    resetInput: resetCity,
    inputBlurHandler: cityInputBlurHandler,
  } = useInput(isEmpty);

  const {
    enteredValue: enteredPostalCode,
    inputInvalid: enteredPostalCodeHasError,
    valueChangeHandler: postalCodeInputChangeHandler,
    resetInput: resetPostalCode,
    inputBlurHandler: postalCodeInputBlurHandler,
  } = useInput(isNotFiveChars);

  const confirmHandler = (event) => {
    event.preventDefault();

    const formIsValid =
      !enteredNameHasError &&
      !enteredCityHasError &&
      !enteredPostalCodeHasError &&
      !enteredStreetHasError;

    if (!formIsValid) {
      console.log(`boo`);
      return;
    }

    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    enteredNameHasError ? classes.invalid : ""
  }`;
  const streetControlClasses = `${classes.control} ${
    enteredStreetHasError ? classes.invalid : ""
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    enteredPostalCodeHasError ? classes.invalid : ""
  }`;
  const cityControlClasses = `${classes.control} ${
    enteredCityHasError ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {enteredNameHasError && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          onChange={streetInputChangeHandler}
          onBlur={streetInputBlurHandler}
        />
        {enteredStreetHasError && <p>Please enter a valid street.</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          onChange={postalCodeInputChangeHandler}
          onBlur={postalCodeInputBlurHandler}
        />
        {enteredPostalCodeHasError && (
          <p>Please enter a 5 digit postal code.</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          onChange={cityInputChangeHandler}
          onBlur={cityInputBlurHandler}
        />
        {enteredCityHasError && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
