import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../GraphQL/schema";
import { resolvers } from "../../GraphQL/resolvers";
import Cors from 'micro-cors'

const cors = Cors()

const apolloServer = new ApolloServer({ typeDefs, resolvers })

// Start the Apollo server
const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.end()
        return
    }
    
    // Wait for the Apollo server to start
    await startServer
    
    // Use the Apollo server's request handler
    await apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})

export const config = {
    api: {
        bodyParser:false,
    }
}
