import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";

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

function CardOrder({ description, date, price, address }) {
  const classes = useStyles();

  const editHandler = () => {
    
  }

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
          <Button onClick={editHandler} variant="contained" size="small" color="primary">
            Изменить заказ
          </Button>
          <Button variant="contained" size="small" color="secondary">
            Удалить
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
export default CardOrder;
