import express from 'express';
import { log } from './../../utils';
import { pedidos } from './../../controllers';

const router = new express.Router();

router.post('/slack/command/report', async (req, res) => {
  try {
    const { channel_id, user_name, text } = req.body;
    pedidos
      .post({ user_name, text })
      .then(result => {
        const response = {
          response_type: 'in_channel',
          channel: channel_id,
          text: `Pedido :shaved_ice: ${
            result.text
          } :shaved_ice: realizado com sucesso  - ID do pedido: ${result.id}`
        };
        return res.json(response);
      })
      .catch(error => {
        log.error(error);
        return res
          .status(500)
          .send("Something blew up. We're looking into it.");
      });
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
      text: JSON.stringify(
        pedidos.map(
          pedido => `${pedido.user_name.split('.').join(' ')} - ${pedido.text}`
        )
      )
    };
    return res.json(response);
  } catch (err) {
    log.error(err);
    return res.status(500).send("Something blew up. We're looking into it.");
  }
});

export default router;
