let isDragging = false;
var net=6; //Шаг сетки в px.

document.addEventListener('mousedown', function(event) {

  let dragElement = event.target.closest('.element');

  if (!dragElement) return;

  event.preventDefault();
  
  dragElement.ondragstart = function() {
      return false;
  };

  let coords, shiftX, shiftY;

  startDrag(dragElement, event.clientX, event.clientY);

  function onMouseUp(event) {
    finishDrag();
  };
  
  function onMouseMove(event) {
    moveAt(event.clientX, event.clientY);
  }

// при начале перетаскивания:
  // запомнить начальный сдвиг
  // перемещаем положение элемента: исправлено и является прямым потомком body
  function startDrag(element, clientX, clientY) {
    if(isDragging) {
      return;
    }
    
    isDragging = true;
    
    document.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseup', onMouseUp);

    shiftX = clientX - element.getBoundingClientRect().left;
    shiftY = clientY - element.getBoundingClientRect().top;

    element.style.position = 'fixed';

    moveAt(clientX, clientY);
  };

// переключаем на абсолютные координаты в конце, чтобы зафиксировать элемент в документе
  function finishDrag() {
    if(!isDragging) {
      return;
    }
    
    isDragging = false;

    dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
    dragElement.style.position = 'absolute';

    document.removeEventListener('mousemove', onMouseMove);
    dragElement.removeEventListener('mouseup', onMouseUp);
  }

  function moveAt(clientX, clientY) {
// новое окно относительных координат
    let newX = clientX - shiftX;
    let newY = clientY - shiftY;

    // проверяем, находятся ли новые координаты ниже нижнего края окна
    let newBottom = newY + dragElement.offsetHeight; // new bottom
   
    // под окном? давайте прокрутить страницу
    if (newBottom > document.documentElement.clientHeight) {
      // оконная координата конца документа
      let docBottom = document.documentElement.getBoundingClientRect().bottom;

      // прокрутка документа вниз на 10 пикселей имеет проблему
      // он может прокручиваться за пределы конца документа
      // Math.min (сколько осталось до конца, 10)
      let scrollY = Math.min(docBottom - newBottom, 10);

      // вычисления неточны, могут быть ошибки округления, которые приводят к прокрутке вверх
      // это должно быть невозможно, исправить это здесь
      if (scrollY < 0) scrollY = 0;

      window.scrollBy(0, scrollY);

      // быстрое движение мыши делает курсор за концом документа
      // если это произойдет -
      // ограничиваем новый Y максимально возможным (справа внизу документа)
      newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
    }

    // проверяем, находятся ли новые координаты выше верхнего края окна (аналогичная логика)
    if (newY < 0) {
      // прокручиваем вверх
      let scrollY = Math.min(-newY, 10);
      if (scrollY < 0) scrollY = 0; // проверка точности ошибок

      window.scrollBy(0, -scrollY);
      // быстрое движение мыши может поставить курсор за пределы начала документа
      newY = Math.max(newY, 0); // newY не может быть ниже 0
    }

    // ограничиваем новый X в границах окна
    // здесь нет прокрутки, так что все просто
    if (newX < 0) newX = 0;
    if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
    }
    // Переносим елемент с учетом сетки (newX-newX%net)
    dragElement.style.left = (newX-newX%net) + 'px';
    dragElement.style.top = (newY-newY%net) + 'px';
  }

});