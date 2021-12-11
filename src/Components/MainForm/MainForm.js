import React from 'react';
import './MainForm.scss';
import {occupation, City} from '../../models/enums'

function MainForm()  {
  const [userData, setUserData] = React.useState({
    experienceYears: 0,
    occupation: "0",
    city: "0",
    incomeYear: "2020",
    netSalary: 0
  })
  function changeHandle(evt) {
    const value = evt.target.value;
    setUserData({
      ...userData,
      [evt.target.name]: value
    });
  }

  function calculateBasicTaxAmount(grossSalary){
    let basicTax = 0;
    let salary = grossSalary >= 36000 ? 36000 : grossSalary;
    if(userData.city === City.Stockholm){
      if(userData.incomeYear === "2019"){
        basicTax = salary * 0.3 
      }
      else if (userData.incomeYear === "2020"){
        basicTax = salary * 0.29
      }
    }

    if(userData.city === City.Gothenburg){
      if(userData.incomeYear === "2019"){
        basicTax = salary * 0.25
      }
      else if (userData.incomeYear === "2020"){
        basicTax = salary * 0.22
      }
    }

    return basicTax;
  }

  function calculateHighTaxAmount(grossSalary){
    let highTax = 0;
    if(grossSalary > 36000){
      highTax = (grossSalary - 36000) * 0.5
    }
    return highTax;
  }

  function calculateExtraHighTaxAmount(grossSalary){
    let extraHighTax = 0;
    if(grossSalary > 45000){
      extraHighTax = (grossSalary - 45000) * 0.7
    }
    return extraHighTax;
  }

  function calculateGrossSalary(){
    var  grossSalary = 0;
    if(userData.occupation === occupation.Programmer){
      grossSalary = 30000
    }
    else if(userData.occupation === occupation.Teacher){
      grossSalary = 27000
    }
    else if(userData.occupation === occupation.Cashier){
      grossSalary = 25000
    }

   if(userData.experienceYears >= 0 && userData.experienceYears <= 3){
      grossSalary = grossSalary + 0
    }
    else if(userData.experienceYears >= 4 && userData.experienceYears <= 7){
      grossSalary = grossSalary + (grossSalary * 0.2)
    }
    else if(userData.experienceYears >= 8 && userData.experienceYears <= 10){
      grossSalary = grossSalary + (grossSalary * 0.4)
    }
    else if(userData.experienceYears >= 11){
      grossSalary = grossSalary + (grossSalary * 0.6)
    }

    return grossSalary;
  }

  function calculateSalary() {
    let grossSalary = calculateGrossSalary();
    let netSalary = grossSalary - calculateBasicTaxAmount(grossSalary) - calculateHighTaxAmount(grossSalary) - calculateExtraHighTaxAmount(grossSalary);

    setUserData({
      ...userData,
      netSalary: netSalary
    });
  }
  
  return (
    <div className="form">
      <div className="form-group">
        <label>Years of experience</label>
        <input name="experienceYears" value={userData.experienceYears} onChange={changeHandle} type="number" min='0' />
      </div>
      <div className="form-group">
        <label>Occupation</label>
        <select name="occupation" value={userData.occupation} onChange={changeHandle}>
          <option value={0}>Programmer</option>
          <option value={1}>Teacher</option>
          <option value={2}>Cashier</option>
        </select>
      </div>
      <div className="form-group">
        <label>City</label>
        <select name="city" value={userData.city} onChange={changeHandle}>
          <option value={0}>Stockholm</option>
          <option value={1}>Gothenburg</option>
        </select>
      </div>
      <div className="form-group">
        <label>Income Year</label>
        <select name="incomeYear" value={userData.incomeYear} onChange={changeHandle}>
          <option>2020</option>
          <option>2019</option>
        </select>
      </div>
      <button onClick={calculateSalary}>Calculate Salary</button>
      <h3>Salary after Tax: 
        <span id='calculatedPayroll'> {userData.netSalary}</span>
      </h3>
      </div>
  );
}

export default MainForm;
