function help_function() {
    let frm = document.forms.reg;
    let id_el = frm.id_el;
    let value_id = id_el.value;
    if(value_id){      
      let get_el = document.getElementById(value_id);
      simpleTree(get_el);
    }
    else{
      alert("Вы ничего не ввели!");
    }  
  }  
  function simpleTree(root){
    let ul = document.createElement('ul');
    let li = document.createElement('li');
    li.innerHTML = root.tagName + " id = '" + root.id + "'";
    ul.appendChild(li);
    ul.appendChild(generateChild(root));
    document.body.appendChild(ul);
  } 
  function generateChild(element) {
    let child = element.firstElementChild;
    let ul = document.createElement('ul');                                
    while(child) {
        let li = document.createElement('li'); 
        if(child.id){
          li.innerHTML = child.tagName + " id = '" + child.id + "'";
        }
        else{
          li.innerHTML = child.tagName
        }                                                                 
        let nextChild = generateChild(child);        
        li.appendChild(nextChild);
        ul.appendChild(li);
        child = child.nextElementSibling;        
    }        
    return ul;
  }
  element = document.getElementById("input");
  element.addEventListener('click',function() {this.remove()});
  