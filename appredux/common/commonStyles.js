var HEADER_HEIGHT = 64;

module.exports = {
    container: {
        flex: 1,
        paddingTop: HEADER_HEIGHT + 150
    },
    content: {
        flex: 1,
        padding: 20
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0
    },
    input: {
        height: 40,
        padding: 10,
        marginBottom: 10,
        borderColor: '#1e90ff',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    label: {
        color: '#1e90ff',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    },
    errorText: {
        backgroundColor: 'red',
        color: 'white',
        padding: 5,
        fontWeight: "700",
        fontStyle: 'italic'
    }
};