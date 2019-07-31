/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  var convertUnits = {'gal': 'l', 'l': 'gal', 'lbs': 'kg', 'kg': 'lbs',
                     'mi': 'km', 'km': 'mi'};
  var spelledOut = {'gal': 'gallons', 'l': 'liters', 'lbs': 'pounds', 'kg': 'kilograms',
                   'mi': 'miles', 'km': 'kilometers'};
  
  this.getNum = function(input) {
    var numValue = input.replace(/[A-Z]/i, '|$&').split('|')[0];
    if (numValue == "") {
      // Value is not present but is still valid, since user doesn't need to give one.
      return 1;
    } else if (numValue.indexOf('/') != -1) {
      // It contains at least 1 'divide by' symbol.
      if (numValue.indexOf('/') != numValue.lastIndexOf('/')) {
        // There are multiple 'divide by' symbols.  This is not permitted.
        return null;
      } 
      return eval(numValue);  // We have to evaluate the 'divide by' symbol
    } else {
      return Number(numValue);
    }
  };
  
  this.getUnit = function(input) {
    if (input.match(/[A-Z]/i) == null) {
      // No 'unit' exists within this input, therefore it is invalid (i.e. 'null');
      return null;
    }
    
    var unitValue = input.replace(/[A-Z]/i, '|$&').split('|')[1];
    
    if (unitValue.match(/^(gal|l|lbs|kg|mi|km)$/i) == null) {
      // Value is alphabetic value, but is not a recognized 'unit'.
      return null;
    } else {
      return unitValue;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    return (initUnit) ? convertUnits[initUnit.toLowerCase()] : initUnit;
  };

  this.spellOutUnit = function(unit) {
    return (unit) ? spelledOut[unit.toLowerCase()] : unit;
  };
  
  this.convert = function(initNum, initUnit) {
    if (!initNum || !initUnit) {
      return null;
    }
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    initUnit = initUnit.toLowerCase();
    
    if (initUnit == 'gal' || initUnit == 'l') {
      return (initUnit == 'gal') ? initNum*galToL : initNum/galToL;
    } else if (initUnit == 'lbs' || initUnit == 'kg') {
      return (initUnit == 'lbs') ? initNum*lbsToKg : initNum/lbsToKg;
    } else {
      return (initUnit == 'mi') ? initNum*miToKm : initNum/miToKm;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    result = {initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit,
           string: initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum +
           ' ' + this.spellOutUnit(returnUnit)};
    
    return result;
  };
  
}

module.exports = ConvertHandler;
