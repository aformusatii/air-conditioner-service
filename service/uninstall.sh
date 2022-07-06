systemctl stop conditioner
systemctl disable conditioner
rm /etc/systemd/system/conditioner.service
systemctl daemon-reload