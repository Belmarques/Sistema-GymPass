import type { FastifyReply, FastifyRequest } from "fastify";

export  function verifyUserRole(roleToVerify: 'ADMIN'|'MEMBER') {
  return async (request:FastifyRequest, resply:FastifyReply) => {
    const {role} = request.user
    if(role !== roleToVerify ) {
      return resply.status(401).send({message:'Unautorized'})
    }
  }
}