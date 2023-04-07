
// Authorize user for todo
  function authorizeUser(req, res, next) {
    const id = parseInt(req.params.id);
    const todo = todos.find(todo => todo.id === id);
  
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
  
    if (todo.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }
  
    next();
  }