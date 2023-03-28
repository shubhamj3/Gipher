import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Bookmark } from '@material-ui/icons';
import "./DisplayCard.css";
import Masonry from 'react-masonry-css'
import MyAppContext from '../MyAppContext';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({

  // overrides: {
  //   MuiCardContent: {
  //     root: {
  //       padding: 0,
  //       "&:last-child": {
  //         paddingBottom: 0,
  //      },
  //     },
  //   },
  // },

  customHoverFocusLike: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#ff867c" }
  },
  customHoverFocusBookmark: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#8e99f3" }
  },

  customHoverFocusShare: {
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#98ee99" }
  },

  root: {
    // minWidth: 300,
    maxWidth: 345,
  },
  media: {
    height: 290,
    // height: 0,
    paddingTop: '76.25%', // 16:9
  },

  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

}));

export default function DisplayCard(props) {


  const sendLoading = (obj) => {
    dispatch({
      type: "LoadingStatus",
      value: {
        loading: obj,
      },
    });
  };


  const sendRender = (obj) => {
    dispatch({
      type: "RenderStatus",
      value: {
        render: obj,

      },
    });
  };



  const { state, dispatch } = useContext(MyAppContext);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const FavoriteHandler = () => {
    // const storedata = {
    //     Poster: props["Poster"], 
    // }
    sendLoading(true)       ///to stop it getting into infinite loop
    sendRender(true);
    const emailToken = localStorage.getItem('email');
    if (emailToken) {
      fetch('http://localhost:8765/api/v1/gipher/save', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        mode: "cors",
        body: JSON.stringify({ embedURL: props.Poster, gipherId: props.id, email: localStorage.getItem('email') })

      }).then(res => res.json())
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Please Login or SignUp To Continue',
        showConfirmButton: false,
        timer: 2000
      })
    }

  }
  return (
    <div className="col-sm-12 col-md-4 col-lg-3 Mycard">
      <div className="m-3 p-2">
        <Card className={classes.root} style={{ backgroundColor: "#eaeddf" }, { background: 'linear-gradient(to right bottom, #430089, #82ffa1)' }}>
          <CardMedia
            className={classes.media}
            image={props.Poster}
          />
          <div className="effect">
            <CardActions disableSpacing>
              <IconButton className={classes.customHoverFocusLike} onClick={FavoriteHandler} aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              {/* <IconButton className={classes.customHoverFocusBookmark}  aria-label="bookmark">
                    <Bookmark />
                  </IconButton>
                  <IconButton className={classes.customHoverFocusShare} aria-label="share">
                    <ShareIcon />
                  </IconButton> */}
              {/* <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton> */}
            </CardActions>
          </div>
        </Card>
      </div>
    </div>
  );
}