import YandexMap from "../YandexMap/YandexMap";
import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Info from "../Info/Info";
import DogInfo from "../DogInfo/DogInfo";
import CardOrder from "../CardOrder/CardOrder";
import { Box, Button, jssPreset } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../CardList/CardList";
import { useHistory } from "react-router";
import { setOrders } from "../../redux/actionCreators/orderAc";
import { changeOrderCustomerStatusRequestedFromServer, changeStatusExecutorInWorkFromServer } from "../../redux/actionCreators/userAC";
import Louder from "../Louder/Louder";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
		paddingTop: 10,
	},
}));



function ExecutorAccount() {
	//обновялет все ордера в редакс
	// const allOrders = useSelector((state) => state.allOrders);
	// useEffect(() => dispatch(setOrders()), [allOrders]);

	const history = useHistory();
	const classes = useStyles();
	const dispatch = useDispatch();
	const [load, setLoad] = useState(false);

  const {current: socket} = useRef(new WebSocket('ws://localhost:3001'))

  useEffect(() => {

    socket.onopen = function(e) {
    // alert("[open] Соединение установлено");
    // alert("Отправляем данные на сервер");
      const messageToServer = {
          type: 'greeting',
      }

    socket.send(JSON.stringify(messageToServer));

  };

    socket.onmessage = function(event) {  

      const parseMessage = JSON.parse(event.data);
    
      console.log('parseMessage =======>', parseMessage.payload);
    
      switch (parseMessage.type) {
        case 'greeting':
          break
    
        case 'approve executor':
          dispatch(changeStatusExecutorInWorkFromServer(parseMessage.payload.order))
          break

        case 'deny executor':
          dispatch(changeOrderCustomerStatusRequestedFromServer())
          break

        default:
          break
      }
        
    };
    
    socket.onerror = function(error) {
      // alert(`[error] ${error.message}`);
    };

    return () => {
      socket.onclose = function(event) {
        if (event.wasClean) {
          // alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
        } else {
          // например, сервер убил процесс или сеть недоступна
          // обычно в этом случае event.code 1006
          // alert('[close] Соединение прервано');
        }
      };

    }


}, [])

  

 

  const handlerHistoryOrders = () => {
    history.push("/historyOrders");
  };
  const handlerDoneOrders = () => {
    history.push("/doneOrders");
  };

	useEffect(() => {
		dispatch(setOrders());
		setTimeout(() => {
			setLoad(true);
		}, 200);

		// все заказы в системе
	}, []);

	return (
		<>
			{!load ? (
				<div style={{ paddingTop: "130px", paddingLeft: "80px" }}>
					<Louder />
				</div>
			) : (
					<Box m={3}>
						<div className={classes.root}>
							<h3>Личный кабинет Исполнителя</h3>
							<Grid container spacing={3} direction="row">
								<Grid item xs={3}>
									<Paper className={classes.paper}>Мои данные</Paper>
									<Info />
									<Box m={3}>
										<Button variant="outlined" onClick={handlerHistoryOrders}>
											Текущие заказы
                  </Button>
									</Box>
									<Box m={3}>
										<Button variant="outlined" onClick={handlerDoneOrders}>
											Выполненные заказы
                  </Button>
									</Box>
									<Box m={3}>
										<Button variant="outlined">Мои отзывы</Button>
									</Box>
									<Box m={3}>
										<Button variant="outlined"><a href="https://t.me/Doggy_walker_bot">Telegram Bot</a></Button>
									</Box>
								</Grid>
								<Grid item xs={8} direction="column">
									<Grid item>
										<Paper className={classes.paper}>Все открытые заказы</Paper>
										<CardList />
									</Grid>

									<Grid item>
										<Paper className={classes.paper}>Все заказы на карте</Paper>
										<Box m={3}>
											<Grid item container spacing={2} direction="row">
												<YandexMap />
											</Grid>
										</Box>
									</Grid>
								</Grid>
							</Grid>
						</div>
					</Box>
				)}
		</>
	);
}

export default ExecutorAccount;
