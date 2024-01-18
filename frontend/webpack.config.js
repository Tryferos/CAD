import NodePolyFillPlugin from 'node-polyfill-webpack-plugin'
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new NodePolyFillPlugin()
    ],
};