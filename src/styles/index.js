import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
   flex: {
       flex: 1
   },
    flexCenter: {
       justifyContent: 'center',
        alignItems: 'center'
    },
    spaceBetween: {
       justifyContent: 'space-between'
    },
    spaceAround: {
       justifyContent: 'space-around'
    },
    flexRow: {
       flexDirection: 'row'
    },
    registerInput: {
       color: '#db786d',
        marginLeft: 50
    },
    inputWrapper: {
       width: width - 40
    },
    logoImg: {
       position: 'absolute',
        top: 40,
        height: 150
    },
    submitBtn: {
        backgroundColor: 'rgb(203, 203, 203)',
        height: 40,
        width: 200,
        marginTop: 10,
    },
    defaultText: {
       color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});