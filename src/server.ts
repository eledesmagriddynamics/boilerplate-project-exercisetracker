import app from './index';

app.listen(process.env.PORT || 3000, () => {
  console.log('App started');
});
