const logout = new LogoutButton;

//деавторизация

logout.action = () => ApiConnector.logout(response => {
   if (response.success === true) {
       location.reload();
   }
});

//получение информации о пользователе 

ApiConnector.current((response) => {
  if(response.success === true) {
    ProfileWidget.showProfile(response.data);
  }
});

//получение текущих курсов валюты

const ratesBoard = new RatesBoard;

ApiConnector.getStocks();

tableCurrency = response => {
  if(response.success === true) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(response.data);
  }
};

ApiConnector.getStocks(tableCurrency);
 //интервал, который вызывает функцию с выводом курса валют каждую минуту
setInterval(() => ApiConnector.getStocks(tableCurrency), 60000);

//операции с деньгами 
//пополнение баланса
const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, response => {
    if (response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Ваш кошелёк упешно пополнен");
    }
    else {
      moneyManager.setMessage(response.success, response.error);
    }
  });
}

//реализуйте конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, response => {
    if(response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Ковертация проведена успешно");
    } else {
      moneyManager.setMessage(response.success, response.error);
    } 
  });
}


//реализуйте перевод валюты
moneyManager.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if(response.success === true) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(response.success, "Перевод денег осуществлён успешно");
    } else {
      moneyManager.setMessage(response.success, response.error);
    } 
  });
}

//Работа с избранными
const favoritesWidget = new FavoritesWidget;
 
ApiConnector.getFavorites((response) => {
  if(response.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

//добавление в список избранных
favoritesWidget.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {  
  if(response.success === true) {
    favoritesWidget.getData();
      ProfileWidget.showProfile(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь добавлен в список избранных");
    } else {
      favoritesWidget.setMessage(response.success, response.error);
  }
  });
}

//удаление из списка избранных 
favoritesWidget.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if(response.success === true) {
      favoritesWidget.getData();
      ProfileWidget.showProfile(response.data);
      favoritesWidget.setMessage(response.success, "Пользователь удалён из списка ибранных");
      } else {
        favoritesWidget.setMessage(response.success, response.error); 
  }
});
}