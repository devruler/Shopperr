<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderConfirmed extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Your order #' . substr($this->order->uuid, 0, 7) . ' has been confirmed')
                    ->greeting('Dear ' . $notifiable->name)
                    ->line('Your order #' . substr($this->order->uuid, 0, 7) . 'has been successfully confirmed.' )
                    ->line('The item(s) will be packed and shipped as soon as possible. You will receive a notification from us as soon as the item (s) are be ready to be delivered.' )
                    ->line('Thank you for purchasing at ' . Env('APP_NAME') . '.' )
                    ->action('Check Order', url('/customer/orders/' . $this->order->id));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
