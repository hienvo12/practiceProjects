
class UI {
  static displayItems1(){
    const htmlgames = Store.getItems1();
    htmlgames.forEach((game) => {
      UI.addItems1(game);
    });
  }
  static addItems1(game){
    const list = document.querySelector('#h1');
    console.log(game);
    //const li = document.createElement("LI");
    list.append(`${game}`);
    list.append(document.createTextNode(" "));
    //list.append(li);
  }
  static addItems2(game){
    const list2 = document.querySelector('.htmlp');
    list2.append(`${game}`);
    list2.append(document.createTextNode(" "));
  }
  static addItems3(game){
    const list3 = document.querySelector('.cg');
    list3.append(`${game}`);
    list3.append(document.createTextNode(" "));
  }
  static addItems4(game){
    const list4 = document.querySelector('.cgg');
    list4.append(`${game}`);
    list4.append(document.createTextNode(" "));
  }
  static showAlert(message, className){
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div, form);
      //vanish after timeout
      setTimeout(() => document.querySelector('.alert').remove(), 2500);
    }
  static clearFields(){
    document.querySelector('#txt1').value = '';
    document.querySelector('#txt2').value = '';
    document.querySelector('#txt3').value = '';
    document.querySelector('#txt4').value = '';
  }
}
class Store{
  static getItems1(){
    let itemsarray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
    return itemsarray;
  }
  static addItems1(title){
    const item1 = Store.getItems1();
    item1.push(title);
    localStorage.setItem('items', JSON.stringify(item1));
  }
}
//
UI.displayItems1();
//
document.getElementById("myBtn").addEventListener("click", (e)=>{
  //prevent  actual submit
  e.preventDefault();
  //
  const title = document.querySelector('#txt1').value;
    //add additem
  UI.addItems1(title);
  Store.addItems1(title);
  const title2 = document.querySelector('#txt2').value;
    //add additem
  UI.addItems2(title2);
  const title3 = document.querySelector('#txt3').value;
    //add additem
  UI.addItems3(title3);

  const title4 = document.querySelector('#txt4').value;
    //add additem
  UI.addItems4(title4);

  UI.clearFields();
});
