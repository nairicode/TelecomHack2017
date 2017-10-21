import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
   flex: {
       flex: 1
   },
    flexCenter: {
       justifyContent: 'center',
        alignItems: 'center'
    },
    flexStart: {
        justifyContent: 'flex-start'
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
    flexEnd: {
      justifyContent: 'flex-end'
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
    },
    header: {
       height: 50,
        width
    },
    statusBarPadding: {
       paddingTop: Platform.OS === 'ios'? 20 : 0
    },
    chart: {
        backgroundColor: 'rgb(203, 203, 203)',
        width: 35
    },
    fullWidth: {
       width
    },
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    menuItem: {
        marginBottom: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgb(203, 203, 203)',
    },
    textBold: {
       fontWeight: 'bold'
    },


    contactView: {
        backgroundColor: 'rgb(203, 203, 203)',
        borderBottomWidth: 1,
        borderColor: '#2196f3',
        width,
        paddingLeft: 15

    },
    contactName: {
        fontSize: 27,
        textAlign: 'left'
    },
    contactPhone: {
        fontSize: 20,
        textAlign: 'right',
        paddingRight: 15
    },
    promptWrapper: {
        position: 'absolute',
        zIndex: 99,
        width,
        height,
        backgroundColor: 'rgba(0,0,0,.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    prompt: {
       position: 'absolute',
        zIndex: 99,
        width: width - 100,
        height: 120,
        backgroundColor: '#fff',
        padding: 10
    },
    packageInfoName: {
       fontSize: 18,
        fontWeight: 'bold'
    },
    packageInfoText: {
       fontSize: 16
    },
    savingText: {
        color: '#12c24a',
        fontSize: 16
    },
    notification: {
       position: 'absolute',
        width,
        backgroundColor: '#12c24a',
        height: 40,
        zIndex: 9999
    }
});