function component() {
  let element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = ['Hello', 'webpack', '!!'].join(' ');

  return element;
}

document.body.appendChild(component());
