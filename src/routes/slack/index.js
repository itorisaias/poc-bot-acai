import express from 'express'
import uuid from 'node-uid'

import { log } from './../../utils'

const router = new express.Router();
const pedidos = [];

router.post('/slack/command/report', async (req, res) => {
  try {
    const { channel_id, user_name, text, team_domain, channel_name } = req.body;
    
    pedidos.push({
      channel_id,
      user_name,
      text,
      timestemp: new Date(),
      team_domain,
      channel_name
    })
    
    const response = {
      response_type: 'in_channel',
      channel: channel_id,
      text: `Pedido :shaved_ice: ${text} :shaved_ice: realizado com sucesso  - ID do pedido: ${uuid()}`
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send("Something blew up. We're looking into it.");
  }
});

router.post('/slack/command/pedidos', async (req, res) => {
  try {
    const { channel_id } = req.body;

    const response = {
      response_type: 'in_channel',
      channel: channel_id,
      text: JSON.stringify(pedidos.map(pedido => `${pedido.user_name.split(".").join(" ")} - ${pedido.text}`))
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send("Something blew up. We're looking into it.");
  }
});

export default router
