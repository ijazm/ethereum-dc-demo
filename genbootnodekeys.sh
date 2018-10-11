docker run --rm sjeeva/ethkeygen > /tmp/bn$$
cat /tmp/bn$$ | grep NodeKey | awk ' { print $2 } ' > bn.key
cat /tmp/bn$$ | grep Enode | awk ' { print $2 } '> bn.enode
echo "BOOTNODE=enode://$(cat bn.enode)@172.172.200.200:30301" > bn.enode.env
echo "Node Key: $(cat bn.key)"
echo "Enode: $(cat bn.enode)"
