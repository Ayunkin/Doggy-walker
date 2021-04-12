import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Button, CardMedia, CardContent, CardActions, CardActionArea, Card } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
		border: "1px solid #1C3E6A",

  },
  media: {
    height: 140,
	},
	pos: {
		margin: 0,
	}
});

function ExecutorCardOrder({ id, description, date, price, address, sendRequestHandler, requested }) {

  const classes = useStyles();
  

  return (
		<Box className={classes.pos} m={4}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://ampravda.ru/files/articles-2/90408/cvyc25f7qt98-1-640.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom component="h2">
              Запланированная дата:{ date.toLocaleString('ru-RU') }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Задание: { description }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Адрес: { address }
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Стоимость: { price } рублей
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions display="flex" justifyContent="center" alignItems="center">
          <Button disabled={requested} onClick={() => sendRequestHandler(id)} variant="contained" size="small" color="primary">
            Принять заказ
          </Button>
          {/* <Button variant="contained" size="small" color="secondary">
            Удалить
          </Button> */}
        </CardActions>
      </Card>
    </Box>
  );
}
export default ExecutorCardOrder;