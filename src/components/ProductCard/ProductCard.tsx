import { IProduct } from "@/models/product.model";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";

import styles from './ProductCard.module.scss';

type IProps = {
    product: IProduct
}

export default function ProductCard({product}: IProps) {
    return (
        <Card sx={{ maxWidth: 345 }} className={styles.card}>
          <CardMedia
            component="img"
            height="200"
            image={product.image}
            alt={`Image of a ${product.title}`}
          />
          <CardHeader
            // avatar={
            //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            //     R
            //   </Avatar>
            // }
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={product.title.substring(0, 90) + (product.title.length > 90 ? '...' : '')}
            subheader={'$' + product.price}
          />
          <CardContent>
            <Typography className={styles.description} variant="body2">
              {product.description}
            </Typography>
          </CardContent>
          {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
        </Card>
      );
}