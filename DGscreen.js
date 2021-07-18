import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/MyHeader';
import db from '../config';


export default class DGscreen extends React.Component {
  constructor() {
    super();
    this.state = {
      like: 0,
      dislike: 0,
    };
  }
  updateStates = async () => {
    var liked, disliked;
    
    var dbref = await db.ref('LikePressed').on('value', (data) => {
      liked = data.val();
      liked = parseInt(liked,2)
      
    });

    dbref = db.ref('DislikePressed').on('value', (data) => {
      disliked = data.val()
      disliked = parseInt(disliked, 10);
    });
    this.setState({ like: liked, dislike: disliked });
    
  };
  componentDidMount() {
    this.updateStates();
  }
  likePressed = async () => {
    const zeroPad = (num, places) => String(num).padStart(places, '0');

    this.state.like = this.state.like + 1;
    this.setState({ like: this.state.like });

    if (this.state.like < 9) {
      this.state.like = zeroPad(this.state.like, 2);
    }
    var like = db.ref('/');

    like.update({
      LikePressed: this.state.like,
    });
  };
  dislikePressed = async () => {

    const zeroPad = (num, places) => String(num).padStart(places, '0');

    this.state.dislike = this.state.dislike + 1;
    this.setState({ dislike: this.state.dislike });

    if (this.state.dislike < 9) {
      this.state.dislike = zeroPad(this.state.dislike, 2);
    }
    var dislike = db.ref('/');
    dislike.update({
      DislikePressed: this.state.dislike,
    });
  };
  render() {
    return (
      <ScrollView>
        <MyHeader title={'Drawing'} navigation={this.props.navigation} />
        <Text
          style={{
            fontSize: 30,
            marginTop: 20,
            marginLeft: 30,
            fontWeight: 'bold',
          }}>
          What is Drawing?
        </Text>
        <Text style={{ marginTop: 10, marginLeft: 40 }}>
          Drawing is a form of visual art in which an artist uses instruments to
          mark paper or other two-dimensional surface. Drawing instruments
          include graphite pencils, pen and ink, various kinds of paints, inked
          brushes, colored pencils, crayons, charcoal, chalk, pastels, erasers,
          markers, styluses, and metals
        </Text>
        <Text
          style={{
            fontSize: 30,
            marginTop: 20,
            marginLeft: 30,
            fontWeight: 'bold',
          }}>
          Who are the famous artist of our century?
        </Text>
        <Text style={{ marginTop: 10, marginLeft: 40 }}>
          1)Pablo Picasso (Spanish painter)
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 20,
            marginLeft: 30,
            fontWeight: 'bold',
          }}>
          His Paintings-
        </Text>
         <Image
          style={styles.imageIcon}
          source={{
            uri:
              'data:image/jpeg;base64,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',
          }}
        />
        <Text style={{ marginLeft: 130,marginTop: 40}}> {this.state.like} </Text> 
        <Text style={{ marginLeft: 180, marginTop: -20}}> {this.state.dislike} </Text>
        <TouchableOpacity onPress={this.likePressed}>
          <Image
            style={styles.upthumbs}
            source={require('../assets/heart.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.dislikePressed}>
          <Image
            style={styles.downthumbs}
            source={require('../assets/bHeart.png')}
          />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageIcon: {
    width: 300,
    height: 150,
    marginLeft: 30,
    marginTop: 25,
  },
  upthumbs: {
    width: 40,
    height: 40,
    marginLeft: 120,
    marginTop: 0,
  },

  downthumbs: {
    width: 40,
    height: 40,
    marginLeft: 170,
    marginTop: -40,
  },
});
