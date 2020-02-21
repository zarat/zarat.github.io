---
layout: post
title:  "ScriptStack - an embedded .NET scripting language and IDE"
description: 
category: test
permalink: /blog/scriptstack
published: true
---

I love Microsoft's .NET reflection feature and I encourage everyone to try it out. [ScriptStack](https://github.com/zarat/scriptstack) - a scripting API - is basically build on top of this feature. [StackShell](https://github.com/zarat/StackShell) is a first implementation.

<div class="media-container"><img src="https://raw.githubusercontent.com/zarat/StackShell/master/ide.gif"></div>

Lets try to build a pluggable program using this feature. First i create an interface to communicate between the host application and the plugin. 
<!--excerpt_separator-->
In this interface are functions where the plugin exposes its functions and a function to call a method.

<pre>
using System;
using System.Collections.Generic;
using System.Text;

namespace PluginInterface
{
    public interface IPluginInfo
    {
        Dictionary<object[], object[]> Methods { get; }
        object Invoke(string methodName, object[] parameters);
    }
}
</pre>

The actual plugin has to implement the interface functions. In the contructor it creates a Dictionary of its methods that the host application can read and implements the `Invoke` method from the interface.

<pre>
using System;
using System.Collections.Generic;
using System.Text;

using PluginInterface;

namespace PluginX
{
    public class PluginInfo : IPluginInfo
    {
        private Dictionary<object[], object[]> _methods = new Dictionary<object[], object[]>();

        public PluginInfo()
        {
            _methods.Add(new object[] { "hello" }, new object[] { typeof(string), typeof(int) } );
            _methods.Add(new object[] { "world" }, new object[] { typeof(string) } );
        }

        public Dictionary<object[], object[]> Methods
        {
            get { return _methods; }
        }

        public object Invoke(string methodName, object[] parameters)
        {
            if (methodName == "hello")
            {
                Console.WriteLine("Method 'hello' invoked with " + parameters.Length + " parameters");
            }

            if (methodName == "world")
            {
                Console.WriteLine("Method 'world' invoked with " + parameters.Length + " parameters");
            }

            return false;
        }
    }
}
</pre>

The host application loads the plugin file, read the Dictionary and can call its functions. 

<pre>
using System;
using System.Collections.Generic;
using System.Text;

using System.IO;
using System.Reflection;
using System.Runtime.Remoting;

using PluginInterface;

namespace PluginTest
{
    class Program
    {
        static void Main( string[] args )
        {
            ObjectHandle handle = Activator.CreateInstanceFrom( "PluginX.dll", "PluginX.PluginInfo" );
            IPluginInfo pluginInfo = handle.Unwrap() as IPluginInfo;
            pluginInfo.Invoke("hello", new object[] {1, 2, 3});
            pluginInfo.Invoke("world", new object[] { "world", 1, "hello", 2 });
        }
    }
}
</pre>
