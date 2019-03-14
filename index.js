// Declare all constants
const ulBegin = '<ul>';
const ulEnd = '</ul>';
const liBegin = '<li>';
const liEnd = '</li>';

function functionPrintUserInfos(users, key) 
{
  let list = ulBegin;
  users.forEach( (user) => 
  {
    list += liBegin;
    if (key === 'name') 
    { list += user.name; } 
    else 
    { list += user.email; }

    list += liEnd;
  });

  return list + ulEnd;
}

function renderList(selector, users, key) 
{
  let divElement = document.querySelector(selector); 
  // Call previous function
  divElement.innerHTML = functionPrintUserInfos(users, key);
}

/* Function for first box.
/  Uses XMLHttpRequest method + its callback to get data from a URL.
/  Displays list of all user e-mails; alphabetical sorting. */
function getEmails() 
{
  let request = new XMLHttpRequest();
  request.open('GET', 'https://jsonplaceholder.typicode.com/users');
  request.onload = function() 
  {
    if (request.status === 200) 
    {
      let users = JSON.parse(request.response);
      users.sort(function(a, b)
      {
        if (a.email < b.email) { return -1; }
        if (a.email > b.email) { return 1; }
        return 0;
      });
      renderList('#emails', users, 'email');
    } else 
    { alert('Error'); }
  };
  request.send();
}

/* Function for second box. Uses fetch method + promise.
/  Displays list of all usernames.
/  Sorted shortest to longest (top to bottom). */
function getNames() 
{
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(function (response) 
      {
        return response.json();
      })
      .then(function (users) 
      {
        users.sort(function(a, b)
        {
          if (a.name.length < b.name.length) { return -1; }
          if (a.name.length > b.name.length) { return 1; }
          return 0;
        });
        renderList('#names', users, 'name');
      })
      .catch(error => alert(error));
}

// Calls two functions to retrieve user emails and user names respectively
function renderLists() 
{
  getEmails();
  getNames();
}

renderLists();
