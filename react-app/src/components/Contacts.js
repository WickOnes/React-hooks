import { contacts } from "../const/const";
import { useState, useEffect, useMemo } from "react";

export const Contacts = () => {
  const [contact, setContact] = useState([]);
  const [genderContact, setGenderContact] = useState([]);
  const [value, setValue] = useState("");
  const [male, setMale] = useState(true);
  const [female, setFemale] = useState(true);
  const [nonGender, setNonGender] = useState(true);

  function curentValue(e) {
    setValue(e.target.value.toLowerCase());
  }
  function chengeCheckMale(e) {
    setMale(e.target.checked);
  }
  function chengeCheckFemale(e) {
    setFemale(e.target.checked);
  }
  function chengeCheckNonGender(e) {
    setNonGender(e.target.checked);
  }
  // ----------------Отрисовка по чекбоксу
  useEffect(() => {
    let filterGender = [];
    contacts.map((el) => {
      if (el.gender === "male" && male === true) {
        filterGender.push(el);
      } else if (el.gender === "female" && female === true) {
        filterGender.push(el);
      } else if (el.gender === undefined && nonGender === true) {
        filterGender.push(el);
      }
    });
    setGenderContact(filterGender);
    setContact(filterGender);
  }, [male, female, nonGender]);
  // ----------------Отрисовка по поиску
  useMemo(() => {
    let searchContact = [];
    genderContact.map((el, i) => {
      if (Object.values(el).join("").toLowerCase().includes(value)) {
        searchContact.push(el);
        setContact(searchContact);
      }
      setContact(searchContact);
    });
  }, [value]);
  // ----------------Добавление картинки для пола
  function imgGender(gender) {
    if (gender === "male") {
      return <p className="male"></p>;
    } else if (gender === "female") {
      return <p className="female"></p>;
    } else {
      return <p className="nonGender"></p>;
    }
  }
  // ----------------Отрисовка контента
  return (
    <div className="content">
      <input className="searchPeople" placeholder="Search" onChange={curentValue} />
      <div className="checkBox">
        <input type="checkbox" onChange={chengeCheckMale} checked={male} />
        <span>Ч</span>
        <input type="checkbox" onChange={chengeCheckFemale} checked={female} />
        <span>Ж</span>
        <input type="checkbox" onChange={chengeCheckNonGender} checked={nonGender} />
        <span>Не визначено</span>
      </div>
      <div className="content__contact">
        {contact.map((el) => (
          <div className="main">
            <p className="firstName">
              {el.firstName} {el.lastName}
            </p>
            <p className="phone">{el.phone}</p>
            <p className="gender">{imgGender(el.gender)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
